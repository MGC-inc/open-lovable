/** Slim key visual that heads every page below the top page. */
export default function PageHero({ src }: { src: string }) {
  return (
    <div className="p-kv_under">
      <figure className="c-ofi">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="c-ofi__img" />
      </figure>
    </div>
  );
}
