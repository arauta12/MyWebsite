import ImageLink from '../ImageLink/ImageLink';
import './Contact.css'

function Contact() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted!');
    }

    return (
        <section id="contact">
            <h2>Contact</h2>
            <div className='contact-section'>
                <form className='section-item'>
                    <div>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder='Name'
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div>
                        <textarea 
                            name="message" 
                            id="message"
                            placeholder='Enter your message'
                            rows={5}
                            cols={30}
                            maxLength={1000}
                            required
                        >
                        </textarea>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Send message</button>
                </form>
                <div className='contact-info section-item'>
                    <div className="contact-item">
                        <img src="/images/gmail1.png" />
                        <p>andreirauta234@gmail.com</p>
                    </div>
                    <div className="contact-item">
                        <img src="/images/linkedin-logo.png" />
                        <p><a href="https://www.linkedin.com/in/andrei-rauta/" target='_blank'>https://www.linkedin.com/in/andrei-rauta/</a></p>
                    </div>
                    <div className="contact-item">
                        <img src="/images/github1.png" />
                        <p><a href="https://github.com/arauta12/" target='_blank'>https://github.com/arauta12/</a></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;