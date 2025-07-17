import LangListing from '../Listing/LangListing';
import TechListing from '../Listing/TechListing';
import './About.css';

function About({ ref }) {
    return (
        <section id="aboutMe">
            <h2>About Me</h2>
            <section id="" className="sectionInfo" ref={ref}>
                <h3>Who am I?</h3>
                <p className='ident'>I am a University student focused on backend development, with the occasional curiosity for other aspects of Computer Science, such as Operating Systems, Programming languages, etc.
                <br /><br />
                I enjoy seeing how diverse areas of Computer Science can interact with other to produce wonderful results:</p>
                <ul>
                    <li>A UI can communicate with backend servers, built from various frameworks like ExpressJS and hosting platforms like AWS, to deliver dynamic content to users from anywhere.</li>
                    <li>Containerization platforms, such as Docker, can be used to virtualize an Operating system to allow backend developers to run backend programs on isolated environments.</li>
                    <li>Different databases can be used to store and retrieve data efficiently, using data structures like B-Trees or LSM-Trees to index and manage it, based on application requirements.</li>
                </ul>
                <br />
                <p>
                Seeing how vast the field of Computer Science is, I am always eager to learn more about it, exploring new technologies and methodologies that can improve my skills and understanding of the field. 
                <br /><br />
                I am eager to see what the future holds for me in this ever-evolving field.
                </p>
            </section>
            <section className="sectionInfo">
                <h3>Education</h3>
                <p>University of Florida</p>
                <p>Expected Graduation: May 2027</p>
                <p>Bachelor's Degree in Computer Science & Mathematics</p>
            </section>
            <LangListing />
            <TechListing />
        </section>
    );
}

export default About;
