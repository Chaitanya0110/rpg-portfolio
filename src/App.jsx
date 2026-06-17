import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import PortfolioScene from './game/PortfolioScene';
import NavBar from './components/NavBar';
import IntroDialogue from './components/IntroDialogue';
import PortfolioModal from './components/PortfolioModal';

const App = () => {
    const gameRef = useRef(null);
    const [activeSection, setActiveSection] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);

    useEffect(() => {
        fetch('/portfolioData.json')
            .then(response => response.json())
            .then(data => setPortfolioData(data))
            .catch(err => console.error("Failed to load portfolio data:", err));
    }, []);

    useEffect(() => {
        if (gameRef.current) return; 

        const config = {
            type: Phaser.AUTO,
            
            scale: {
                mode: Phaser.Scale.RESIZE,
                parent: 'game-container',
                width: '100%',
                height: '100%'
            },
            pixelArt: true,
            physics: { default: 'arcade', arcade: { debug: false } },
            scene: [PortfolioScene]
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;

        const handleOpenModal = (event) => setActiveSection(event.detail);
        window.addEventListener('open-portfolio-modal', handleOpenModal);

        return () => {
            window.removeEventListener('open-portfolio-modal', handleOpenModal);
            game.destroy(true);
            gameRef.current = null;
        };
    }, []);

    return (
        
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            
            <NavBar setActiveSection={setActiveSection} />
            
            <div id="game-container" style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}></div>
            
            {activeSection === 'intro' && portfolioData && (
                <IntroDialogue 
                    text={portfolioData.intro.text} 
                    onClose={() => setActiveSection(null)} 
                />
            )}
            
            <PortfolioModal 
                activeSection={activeSection} 
                portfolioData={portfolioData} 
                onClose={() => setActiveSection(null)} 
            />
        </div>
    );
}

export default App;