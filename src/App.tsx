import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { api } from "./service/api";

const Header = () => (
  <div className="text-center mb-4">
    <h2 className="section-title">Quarto do Futuro</h2>
    <p className="section-subtitle">
      Explore o futuro agora! Descubra conforto e inovação em nosso quarto
      futurista. Reserve sua estadia e mergulhe em uma experiência única de
      tecnologia e design avançado.
    </p>
  </div>
);

const renderCaracteristicas = (caracteristicasRawText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(caracteristicasRawText, "text/html");
  const ulElement = doc.querySelector("ul");
  if (ulElement) {
    return (
      <div className="caracteristicas">
        <h5>Características</h5>
        <ul>
          {Array.from(ulElement.children).map((li, index) => (
            <li key={index}>{li.textContent}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

const splitByPeriod = (text) => {
  const sentences = text.split(".").slice(0, -1);
  return sentences.map((sentence, index) => (
    <p key={index}>
      <i className="fas fa-check"></i> {sentence.trim()}
    </p>
  ));
};
const RoomDetails = ({
  nome,
  description,
  imgSrc,
  checkIn,
  checkOut,
  houseRules,
  childrenAndExtraBeds,
  amenities,
  caracteristicasRawText,
}) => (
  <div className="row">
    <div className="col-md-8">
      <div className="card mb-4">
        <img
          src={imgSrc}
          className="card-img-top rounded-border img-fluid"
          alt={nome}
        />
        <div className="card-body">
          <h3 className="card-title">{nome}</h3>
          <p className="card-text">{description}</p>
          <div className="row">
            <div className="col">
              <div className="check-in-out">
                <h5>
                  <i className="fas fa-arrow-right-from-bracket"></i> Check In
                </h5>
                {splitByPeriod(checkIn)}
              </div>
            </div>
            <div className="col">
              <div className="check-in-out">
                <h5>
                  <i className="fas fa-arrow-right-from-bracket"></i> Check Out
                </h5>
                {splitByPeriod(checkOut)}
              </div>
            </div>
          </div>
          <div className="house-rules">
            <h5>Regras</h5>
            <p>{houseRules}</p>
          </div>
          <div className="children-extra-beds">
            <h5>Crianças e camas extras</h5>
            <p>{childrenAndExtraBeds}</p>
          </div>
          {renderCaracteristicas(caracteristicasRawText)}
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Facilidades</h5>
          <ul className="list-group list-group-flush">
            {amenities.map((amenity, index) => (
              <li key={index} className="list-group-item">
                {amenity.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const getRooms = async () => {
  try {
    const response = await api.get("/o/c/rooms");
    return response.data.items[0];
  } catch (error) {
    console.log("error", error);
  }
};

function App() {
  const { data } = useQuery({ queryKey: ["room"], queryFn: getRooms });

  return (
    <div className="container mt-4">
      <Header />
      <div className="row">
        {/* <RoomDetails {...roomDetails} />
        <Amenities amenities={amenities} /> */}
        {data !== undefined && (
          <RoomDetails
            nome={data?.nome}
            description={data?.description}
            imgSrc={data?.imgSrc}
            checkIn={data?.checkIn}
            checkOut={data?.checkOut}
            houseRules={data?.houseRules}
            childrenAndExtraBeds={data?.childrenAndExtraBeds}
            amenities={data?.amenities}
            caracteristicasRawText={data?.caracteristicasRawText}
          />
        )}
      </div>
    </div>
  );
}

export default App;
