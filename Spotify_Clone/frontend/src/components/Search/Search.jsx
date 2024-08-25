import React from "react";
import Layout from "../../Layout/Layout";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";

const Search = () => {
  const { filteredSongs } = useGlobalContext();
  return (
    <Layout>
      <Navbar />
      <div className="tertiary_bg mx-2 md:mx-4 px-2 md:px-4 py-4 home m-3">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-lg md:text-xl font-bold hover:underline cursor-pointer">
            Browse All
          </span>
        </div>
        {filteredSongs?.length <= 0 && (
          <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <CategoryCard
              title={"Live Events"}
              img={"/assets/Arijit-1.jpg"}
              color={"bg-purple-500"}
            />
            <CategoryCard
              title={"Made For You"}
              img={"/assets/Arijit-1.jpg"}
              color={"bg-red-500"}
            />
             <CategoryCard
              title={"Best Hits"}
              img={"/assets/Shreya-1.jpg"}
              color={"bg-red-500"}
            />
            <CategoryCard
              title={"New Releases"}
              img={"/assets/Arijit-1.jpg"}
              color={"bg-orange-500"}
            />
            <CategoryCard
              title={"Live Events"}
              img={"/assets/Arijit-1.jpg"}
              color={"bg-purple-500"}
            />
            <CategoryCard
              title={"Live Events"}
              img={"/assets/Arijit-1.jpg"}
              color={"bg-purple-500"}
            />
          </div>
        )}
        {filteredSongs?.length > 0 && (
          <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredSongs.map((song) => {
              return <Card key={song.id} song={song} />;
            })}
          </div>
        )}
      </div>
      <SongBar />
    </Layout>
  );
};

const CategoryCard = ({ title, img, color }) => {
  return (
    <div
      className={`p-4 rounded-lg w-full ${color} relative overflow-hidden h-40 sm:h-48 md:h-56`}
    >
      <span className="text-lg md:text-xl font-semibold mt-2">{title}</span>
      <img
        src={img}
        alt=""
        className="w-1/2 h-1/2 absolute bottom-0 -right-4 md:-right-8 rotate-45 object-cover"
      />
    </div>
  );
};

export default Search;
