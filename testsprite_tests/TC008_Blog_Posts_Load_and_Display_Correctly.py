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
        # Navigate to the blog section by clicking the Blog link in the navigation bar.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/header/div/div/div/nav/div[7]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Select the first blog post to view its full content.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/main/div/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Scroll down to check if more blog posts load correctly and verify the continuous display of titles, excerpts, and timestamps.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Scroll further down to check if additional posts load and continue to display correctly.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Assert that the blog posts section displays all posts with correct titles, excerpts, and timestamps.
        frame = context.pages[-1]
        blog_posts = frame.locator('xpath=//main//div[contains(@class, "blog-posts")]//article')
        expected_posts = [
            {
                'title': 'Análise Fundamentalista: A Ciência por Trás dos Investimentos Inteligentes',
                'summary': 'Descubra como a análise fundamentalista transforma dados econômicos e financeiros em decisões estratégicas de investimento. Domine os conceitos-chave com exemplos práticos e referências acadêmicas.',
                'date': '20/03/2024'
            },
            {
                'title': 'Indicadores Econômicos e Análise Fundamentalista',
                'summary': 'Explora indicadores financeiros como P/L, P/VP e Margem Líquida, com exemplos práticos e referências de autores renomados para avaliar a saúde financeira de uma empresa.',
                'date': '20/03/2024'
            },
            {
                'title': 'Indicadores Essenciais da Análise Fundamentalista',
                'summary': 'Principais indicadores como ROIC, EV/EBITDA, CAGR, Dívida Líquida/EBITDA, Dividend Yield e Fluxo de Caixa Livre para decisões de investimento informadas, com exemplos do mercado brasileiro.',
                'date': '20/03/2024'
            },
            {
                'title': 'Valuation - Fluxo de Caixa Descontado (DFC)',
                'summary': 'Domine o método DCF para valuation de empresas, aprenda fórmulas corretas, evite erros comuns e utilize planilhas profissionais.',
                'date': '20/03/2024'
            },
            {
                'title': 'Como Analisar Setores da Economia Antes de Investir',
                'summary': 'A análise setorial permite identificar oportunidades de investimento em setores em crescimento ou com potencial futuro.',
                'date': '19/03/2024'
            },
            {
                'title': 'Ciclo Econômico e Seus Impactos nos Investimentos',
                'summary': 'Entenda as fases do ciclo econômico e como elas influenciam ativos, setores e estratégias de investimento, ajudando o investidor a ajustar sua carteira.',
                'date': '19/03/2024'
            },
            {
                'title': 'Os Maiores Erros de Investidores Iniciantes',
                'summary': 'Análise dos erros comuns cometidos por investidores iniciantes e dicas práticas para evitá-los, visando melhor retorno financeiro e estabilidade emocional.',
                'date': '19/03/2024'
            },
            {
                'title': 'Riscos Econômicos e o seu Patrimônio em Crises',
                'summary': 'Como proteger seu patrimônio em crises econômicas, explorando riscos macroeconômicos e estratégias de hedge com derivativos, ouro, dólar e outros ativos defensivos.',
                'date': '19/03/2024'
            },
            {
                'title': 'Análise Fundamentalista vs. Análise Técnica',
                'summary': 'Diferenças, vantagens e desvantagens entre Análise Fundamentalista e Técnica, e como combiná-las para decisões de investimento mais informadas.',
                'date': '18/03/2024'
            },
            {
                'title': 'Como Dar os Primeiros Passos no Mercado',
                'summary': 'Conceitos básicos do mercado financeiro, principais tipos de investimentos no Brasil e como a Auge Invest pode ajudar em decisões estratégicas.',
                'date': '18/03/2024'
            },
            {
                'title': 'Principais Indicadores Econômicos',
                'summary': 'Como interpretar os principais indicadores macroeconômicos e sua influência nos investimentos.',
                'date': '18/03/2024'
            }
         ]
        assert await blog_posts.count() == len(expected_posts), f"Expected {len(expected_posts)} blog posts, but found {await blog_posts.count()}"
        for i, post in enumerate(expected_posts):
            post_locator = blog_posts.nth(i)
            title_locator = post_locator.locator('xpath=.//h2')
            summary_locator = post_locator.locator('xpath=.//p[contains(@class, "summary")]')
            date_locator = post_locator.locator('xpath=.//time')
            assert await title_locator.text_content() == post['title'], f"Post {i} title mismatch"
            assert await summary_locator.text_content() == post['summary'], f"Post {i} summary mismatch"
            assert await date_locator.text_content() == post['date'], f"Post {i} date mismatch"
        # Assert that the full blog content is rendered correctly after selecting the first post
        full_content_locator = frame.locator('xpath=//main//article[contains(@class, "full-blog-post")]')
        assert await full_content_locator.is_visible(), "Full blog content is not visible"
        full_title = await full_content_locator.locator('xpath=.//h1').text_content()
        assert full_title == expected_posts[0]['title'], "Full blog post title mismatch"
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    