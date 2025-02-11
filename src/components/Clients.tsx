
const Clients = () => {
  const clients = [
    {
      name: "Australia Maa Meme",
      logo: "https://res.cloudinary.com/des4un3c1/image/upload/c_thumb,w_200,g_face/v1739259115/438198332_828757362606412_8203049831905268483_n_rume9h.jpg"
    },
    /*{
      name: "Grace International Education Consultancy",
      logo: "https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/415512344_806907538142332_2054309482824719659_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ZfChfSpKqmEQ7kNvgHnxzN_&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=A1WHjRojpP0s3boJG932tmN&oh=00_AYBBUQSU_gAFLQxJrVlqQrfqxVUqbsd4EMKb1rcXTwrrtg&oe=67A66498"
    },*/
    {
      name: "NRNA Australia SCC NSW",
      logo: "https://res.cloudinary.com/des4un3c1/image/upload/c_thumb,w_200,g_face/v1739259115/326254203_629484835517286_3231513524220765282_n_fp8lzc.jpg"
    },
    {
      name: "Nepal Festival Sydney 2024",
      logo: "https://res.cloudinary.com/des4un3c1/image/upload/c_thumb,w_200,g_face/v1739259116/301cdc79_373b_44db_886f_e83e09f2de1e_17313069611731335522_zcuswb.jpg"
    }
  ];

  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-[#1a0000] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our Clients</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proud to work with these amazing organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-white text-center">{client.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
