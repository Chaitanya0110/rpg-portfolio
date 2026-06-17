const PortfolioModal = ({ activeSection, portfolioData, onClose }) => {
    if (!activeSection || activeSection === 'intro') return null;

    const renderContent = () => {
        
        // --- RESUME ---
        if (activeSection === 'resume') {
            const profile = portfolioData?.profile || {};

            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', width: '100%' }}>
                    
                    {/* Header Section (Shrinks to fit content) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                        <div>
                            <h2 style={{ margin: 0, color: '#e0e0e0' }}>My Resume</h2>
                            <p style={{ margin: '5px 0 0 0', color: '#a0a0a0', fontSize: '0.9rem' }}>
                                {profile.name} • {profile.location.trim().substring(15)}
                            </p>
                        </div>
                        <a 
                            href={`/${profile.resumeFilename || 'resume.pdf'}`} 
                            download={profile.resumeFilename || 'resume.pdf'} 
                            style={{
                                padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white',
                                textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px',
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            Download PDF
                        </a>
                    </div>

                    <div style={{ 
                        flex: 1, width: '100%', minHeight: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' 
                    }}>
                        <iframe 
                            src={`/${profile.resumeFilename || 'resume.pdf'}`} 
                            width="100%" height="100%" 
                            style={{ border: 'none', display: 'block' }} title="Resume PDF Viewer"
                        />
                    </div>
                </div>
            );
        }

        if (!portfolioData || !portfolioData[activeSection]) {
            return <p>Loading data or section not found...</p>;
        }

        const data = portfolioData[activeSection];

        // --- ABOUT ---
        if (activeSection === 'about') {
            return <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{data.description}</p>;
        }

        // --- SKILLS ---
        if (activeSection === 'skills') {
            
            const skillCategories = [
                { key: 'languages', title: 'Languages', color: '#4da6ff', bg: 'rgba(77, 166, 255, 0.1)', border: 'rgba(77, 166, 255, 0.2)' },
                { key: 'frameworks-and-libraries', title: 'Frameworks & Libraries', color: '#a374ff', bg: 'rgba(163, 116, 255, 0.1)', border: 'rgba(163, 116, 255, 0.2)' },
                { key: 'tools-and-platforms', title: 'Tools & Platforms', color: '#ff7eb3', bg: 'rgba(255, 126, 179, 0.1)', border: 'rgba(255, 126, 179, 0.2)' },
                { key: 'core-concepts', title: 'Core Concepts', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.2)' },
                { key: 'specialized-integrations', title: 'Specialized Integrations', color: '#facc15', bg: 'rgba(250, 204, 21, 0.1)', border: 'rgba(250, 204, 21, 0.2)' },
                { key: 'soft-skills', title: 'Soft Skills', color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.2)' }
            ];

            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px', width: '100%' }}>
                    {skillCategories.map(category => {
                        
                        const skillList = data[category.key];
                        
                        if (!skillList || skillList.length === 0) return null; 

                        return (
                            <div key={category.key} style={{ 
                                flex: '1 1 300px', padding: '25px', 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' 
                            }}>
                                <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#e0e0e0' }}>
                                    {category.title}
                                </h3>
                                
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {skillList.map(skill => (
                                        <span key={skill} style={{ 
                                            padding: '8px 14px', 
                                            backgroundColor: category.bg, 
                                            color: category.color, 
                                            borderRadius: '20px', 
                                            fontSize: '0.9rem', 
                                            fontWeight: '500', 
                                            border: `1px solid ${category.border}` 
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        

        // --- PROJECTS ---
        if (activeSection === 'projects') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '20px', width: '100%' }}>
                    {data.list.map((proj, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '25px', 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#e0e0e0', fontWeight: '600' }}>
                                    {proj.name}
                                </h3>
                                
                                {/* Project Type styled as a pill badge */}
                                <span style={{ 
                                    padding: '6px 12px', 
                                    backgroundColor: 'rgba(77, 166, 255, 0.1)', 
                                    color: '#4da6ff', 
                                    borderRadius: '20px', 
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    border: '1px solid rgba(77, 166, 255, 0.2)'
                                }}>
                                    {proj.type}
                                </span>
                            </div>
                            
                            {/* Description */}
                            <p style={{ marginTop: '15px', color: '#b3b3b3', lineHeight: '1.6', fontSize: '1rem' }}>
                                {proj.description}
                            </p>
                            
                            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <a 
                                    href={proj.link}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    style={{ 
                                        color: '#4da6ff', 
                                        textDecoration: 'none', 
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    View Project &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        // --- CONTACT ---
        if (activeSection === 'contact') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500', color: '#e0e0e0' }}>Email</h3>
                        <a href={`mailto:${data.email}`} style={{ color: '#4da6ff', textDecoration: 'none', fontWeight: '600' }}>{data.email}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500', color: '#e0e0e0' }}>LinkedIn</h3>
                        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#4da6ff', textDecoration: 'none', fontWeight: '600' }}>View Profile</a>
                    </div>
                </div>
            );
        }

        // --- CODING PLATFORMS ---
        if (activeSection === 'coding-platforms'){
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    {data.platforms.map((platform, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ height: '50px', width: '50px' }}>
                                    <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={platform.image} alt={platform.name} />
                                </div>
                                <h2 style={{ margin: 0 }}>{platform.name}</h2>
                            </div>
                            <a href={platform.url} target="_blank" rel="noopener noreferrer" style={{ color: '#4da6ff', textDecoration: 'underline', cursor: 'pointer' }}>Visit</a>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '70%', height: '80%', background: 'rgba(15, 40, 60, 0.95)', zIndex: 20, 
            padding: '30px 40px', borderRadius: '10px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            color: 'white', display: 'flex', flexDirection: 'column'
        }}>
            
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 20px 0', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '10px', flexShrink: 0 }}>
                {portfolioData?.[activeSection]?.title || activeSection.toUpperCase()}
            </h2>
            
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, paddingRight: '10px' }}>
                {renderContent()}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', flexShrink: 0 }}>
                <button 
                    style={{ 
                        padding: '10px 25px', cursor: 'pointer', background: '#ef1111', color: 'white', 
                        border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '1rem'
                    }}  
                    onClick={onClose}
                >
                    Close Window
                </button>
            </div>

        </div>
    );
};

export default PortfolioModal;