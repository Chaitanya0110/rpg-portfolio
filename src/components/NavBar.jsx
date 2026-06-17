const NavBar = ({ setActiveSection }) => {
    const navStyle = {
        width: '100%', 
        padding: '15px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        background: '#0f172a', 
        boxSizing: 'border-box', 
        zIndex: 10
    };

    const btnStyle = {
        padding: '10px 20px', cursor: 'pointer', background: '#3b82f6', 
        color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold'
    };

    return (
        <nav style={navStyle}>
            <button style={btnStyle} onClick={() => setActiveSection('about')}>About Me</button>
            <button style={btnStyle} onClick={() => setActiveSection('projects')}>Projects</button>
            <button style={btnStyle} onClick={() => setActiveSection('skills')}>Skills</button>
            <button style={btnStyle} onClick={() => setActiveSection('contact')}>Contact</button>
            <button style={btnStyle} onClick={() => setActiveSection('coding-platforms')}>Coding Platforms</button>
            <button style={btnStyle} onClick={() => setActiveSection('resume')}>Resume</button>
        </nav>
    );
};

export default NavBar;