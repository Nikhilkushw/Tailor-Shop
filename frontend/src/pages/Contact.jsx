import ContactForm from '../components/ContactForm'
import Map from '../components/Map'

export default function Contact() {
  return (
    <section className="container py-12 grid md:grid-cols-2 gap-8">
      {/* Left Side : Contact Form + Info */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Please share your details. We will call you back.
        </p>

        {/* Form + WhatsApp button */}
        <ContactForm />

        {/* Static Info */}
        <div className="mt-4 text-sm text-gray-700">
          Phone:{" "}
          <a href="tel:+918305310168" className="text-sky-600">
            +91 8305310168
          </a>
          <br />
          WhatsApp:{" "}
          <a
            href="https://wa.me/918305310168"
            target="_blank"
            className="text-sky-600"
          >
            Chat on WhatsApp
          </a>
          <br />
          Address: Vinay Nagar Sector - 04, Near BSNL Building, Gwalior, MP
          474012
        </div>
      </div>

      {/* Right Side : Map */}
      <Map />
    </section>
  )
}
