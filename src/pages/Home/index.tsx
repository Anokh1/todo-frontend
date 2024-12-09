import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { useState } from "react";
import background from "../../assets/images/undefined.jpg"; // Adjust the path accordingly

const Home: React.FC = () => {
  const [components] = useState([
    {
      title: "Button Component",
      description: "PrimeReact Buttons are fully customizable.",
      content: <Button label="Click Me" className="p-button-success" />,
    },
    {
      title: "Card Component",
      description: "Cards are flexible containers with many options.",
      content: (
        <Card title="Card Title" subTitle="Card Subtitle">
          <p>Content inside the card.</p>
        </Card>
      ),
    },
    {
      title: "Carousel Component",
      description: "Showcase multiple items with a carousel.",
      content: (
        <Carousel
          value={["Item 1", "Item 2", "Item 3"]}
          numVisible={1}
          numScroll={1}
          itemTemplate={(item) => <div>{item}</div>}
        />
      ),
    },
  ]);

  return (
    <div className="flex flex-column">
      {/* Hero Section */}
      <div
        className="flex align-items-center justify-content-center"
        style={{
          height: "100vh",
          backgroundImage: `url(${background})`, // Corrected this line
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <h1 className="text-7xl font-bold">2024</h1>
      </div>

      {/* Components Section */}
      <div className="p-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Explore PrimeReact Components
        </h2>
        <div className="grid">
          {components.map((comp, index) => (
            <div key={index} className="col-12 md:col-4">
              <Card title={comp.title} subTitle={comp.description}>
                <div className="flex align-items-center justify-content-center">
                  {comp.content}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
