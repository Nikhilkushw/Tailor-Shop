import Gallery from '../components/Gallery'

export default function Work(){
  return (
    <>
      <Gallery />
      <section className="container pb-12 text-sm text-gray-600">
        Tip: Update images in <code>src/data/works.js</code> with your own URLs.
      </section>
    </>
  )
}
