const DemoVideo = () => {
  return (
    <div className="relative z-10 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
      <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
        <video
          className=" w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/app-rangooo.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>
    </div>
  );
};

export default DemoVideo;
