import React, { useEffect, useRef, memo, useState } from 'react';
import { Box, useTheme } from '@mui/material';

interface MapaArvoreProps {
    onLoadingChange?: (loading: boolean) => void;
}

const MapaArvoreComponent: React.FC<MapaArvoreProps> = ({ onLoadingChange }) => {
    const container = useRef<HTMLDivElement>(null);
    const [widgetId] = useState(`tv-widget-${Math.random().toString(36).substring(2, 9)}`);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    useEffect(() => {
        if (!container.current) return;
        onLoadingChange?.(true);
        const currentContainer = container.current;

        // Create a complete widget structure that TradingView expects
        currentContainer.innerHTML = `
            <div class="tradingview-widget-container__widget" id="${widgetId}"></div>
            <div class="tradingview-widget-copyright"></div>
        `;

        // Add the script with a slight delay to ensure DOM is ready
        const scriptTimeout = setTimeout(() => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = JSON.stringify({
                container_id: widgetId,
                exchanges: ["BMFBOVESPA"],
                dataSource: "AllBR",
                grouping: "sector",
                blockSize: "market_cap_basic",
                blockColor: "change",
                locale: "br",
                symbolUrl: "http://augeinvest.com.br/empresa/{tvsymbol}",
                colorTheme: isDarkMode ? "dark" : "light",
                hasTopBar: true,
                isDataSetEnabled: false,
                isZoomEnabled: true,
                hasSymbolTooltip: true,
                isMonoSize: false,
                width: "100%",
                height: "100%"
            });

            currentContainer.appendChild(script);

            let attempts = 0;
            const maxAttempts = 20;
            const checkWidgetLoaded = setInterval(() => {
                attempts++;
                const widget = document.getElementById(widgetId);
                if ((widget && widget.children.length > 0) || attempts >= maxAttempts) {
                    clearInterval(checkWidgetLoaded);
                    onLoadingChange?.(false);
                }
            }, 100);

            return () => {
                clearInterval(checkWidgetLoaded);
            };
        }, 200);

        return () => {
            clearTimeout(scriptTimeout);
            onLoadingChange?.(false);
            currentContainer.innerHTML = '';
        };
    }, [onLoadingChange, widgetId, isDarkMode]);

    return (
        <Box
            sx={{
                width: '60vw',
                height: '800px',
                flex: 1,
                minHeight: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                '& .tradingview-widget-copyright': {
                    display: 'none'
                }
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '100%',
                    height: '700px',
                    position: 'relative'
                }}
            >
                <div
                    className="tradingview-widget-container"
                    ref={container}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                ></div>
            </div>
        </Box>
    );
};

export const MapaArvore = memo(MapaArvoreComponent);
MapaArvore.displayName = 'MapaArvore';

