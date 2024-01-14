import React from "react";

import { discoverMovies, getTrending } from "../app/app.api";
import { MediaList } from "../components/organisms/MediaList";

import "./App.css";

function App() {
  return (
    <main>
      <nav></nav>
      <article className="flex flex-col gap-12 py-12">
        <section>
          <div className="w-full overflow-x-auto">
            <div className="flex gap-8 w-fit px-12">
              <MediaList request={() => getTrending()} />
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <h2>Discover</h2>
          <div className="w-screen">
            <div className="w-full flex flex-wrap justify-center gap-8 w-fit">
              <MediaList request={() => discoverMovies()} />
            </div>
          </div>
        </section>
      </article>
      <footer></footer>
    </main>
  );
}

export default App;
