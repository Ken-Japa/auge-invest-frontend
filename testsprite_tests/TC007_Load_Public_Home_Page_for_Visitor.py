import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Assert header logo text
        assert await page.text_content('header >> text=Auge Invest') == 'Auge Invest'
        # Assert header navigation items
        header_nav_items = ['Início', 'Quem Somos', 'Soluções', 'FAQ', 'Preços', 'Contato', 'Blog', 'Login', 'Registrar']
        for item in header_nav_items:
            assert await page.is_visible(f'header >> text={item}')
        # Assert main section welcome message and tagline
        assert await page.text_content('main >> text=Seja bem vindo a Auge Invest') == 'Seja bem vindo a Auge Invest'
        assert await page.text_content('main >> text=Domine o Mercado com Dados, Não com Palpites') == 'Domine o Mercado com Dados, Não com Palpites'
        # Assert main section description
        expected_description = 'A única plataforma do Brasil com histórico de derivativos, simulação de estratégias em cenários reais e fictícios e recomendações através de análises – para você investir como um profissional.'
        assert await page.text_content(f'main >> text={expected_description}') == expected_description
        # Assert call to action buttons
        assert await page.is_visible('text=Experimente Grátis por 21 Dias')
        assert await page.is_visible('text=Ver Demonstração em Vídeo')
        # Assert features titles and details
        features = [
            ('+1500 Ativos Monitorados', 'Ações, FIIs, ETFs, moedas e até derivativos obscuros – tudo num só lugar'),
            ('Previsões com Redes Neurais', 'Análise automática de padrões para identificar oportunidades antes que todos'),
            ('Alertas de Preço Cirúrgicos', 'Configure níveis críticos e receba notificações exatas no seu celular ou no email')
        ]
        for title, details in features:
            assert await page.is_visible(f'main >> text={title}')
            assert await page.is_visible(f'main >> text={details}')
        # Assert footer description and contact email
        assert await page.text_content('footer >> text=Inovações tecnológicas com o objetivo de fornecer ao investidor a melhor visão do mercado.') == 'Inovações tecnológicas com o objetivo de fornecer ao investidor a melhor visão do mercado.'
        assert await page.text_content('footer >> text=capitalauge@gmail.com') == 'capitalauge@gmail.com'
        # Assert footer links
        footer_links = ['Início', 'Quem somos', 'Recursos', 'Preços', 'FAQ', 'Fale Conosco', 'Junte-se a equipe', 'Política de Privacidade', 'Termos de Serviço', 'Blog']
        for link in footer_links:
            assert await page.is_visible(f'footer >> text={link}')
        # Assert footer copyright and platform name
        assert await page.text_content('footer >> text=© 2025 Auge Capital. Todos os direitos reservados.') == '© 2025 Auge Capital. Todos os direitos reservados.'
        assert await page.text_content('footer >> text=Auge Invest | Plataforma de Análise de Investimentos') == 'Auge Invest | Plataforma de Análise de Investimentos'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    