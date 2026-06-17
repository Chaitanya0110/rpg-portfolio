import { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 30 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayedText(''); 
        
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
};

const IntroDialogue = ({ text, onClose }) => {
    return (
        <div style={{
            position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
            width: '70%', background: 'rgba(0, 0, 0, 0.85)', color: 'white', 
            padding: '25px', borderRadius: '10px', border: '4px solid #fff',
            fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: '1.6', zIndex: 20
        }}>

            <Typewriter text={text} speed={40} />
            
            <button 
                style={{ 
                    padding: '10px 20px', cursor: 'pointer', color: 'white', border: 'none', 
                    borderRadius: '5px', fontWeight: 'bold', background: '#22c55e', 
                    display: 'block', marginTop: '20px', marginLeft: 'auto' 
                }} 
                onClick={onClose}
            >
                Got it!
            </button>
        </div>
    );
};

export default IntroDialogue;