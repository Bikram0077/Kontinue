
const Clients = () => {
  const clients = [
    {
      name: "Australia Maa Meme",
      logo: "https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/438198332_828757362606412_8203049831905268483_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=8DaE7zSMGRgQ7kNvgFYwCtF&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=ANtCqhIdvaCo1ZCHEdM3SVL&oh=00_AYBDa23fSSRyvKHMQ2B8BZGoJS784fg9x5G407S0wtZ7hw&oe=67A640B5"
    },
    /*{
      name: "Grace International Education Consultancy",
      logo: "https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/415512344_806907538142332_2054309482824719659_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ZfChfSpKqmEQ7kNvgHnxzN_&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=A1WHjRojpP0s3boJG932tmN&oh=00_AYBBUQSU_gAFLQxJrVlqQrfqxVUqbsd4EMKb1rcXTwrrtg&oe=67A66498"
    },*/
    {
      name: "NRNA Australia SCC NSW",
      logo: "https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/326254203_629484835517286_3231513524220765282_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=dYSxzW8at8MQ7kNvgGVbTTI&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=At13DnhFjRekrFV8jAnfeKY&oh=00_AYA1JUy-KRx3OhsK3MvhdSW1l-2z52R4Mqt2ROnIzBpYhA&oe=67A64EA1"
    },
    {
      name: "Nepal Festival Sydney 2024",
      logo: "https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/454731888_476277018580825_741846519214628119_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=U6Iv0kwNb60Q7kNvgG0rfIY&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=AWaqvyOWZOaP9v2DxsQVPVh&oh=00_AYBX8jLLZs8FkpQ8YRHrBKfAhjxQszFXf1thJG8LCPAJkQ&oe=67A65604"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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