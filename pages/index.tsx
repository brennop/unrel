import { useState, useEffect, useMemo } from "react"
import Head from 'next/head'

import { getTrending, searchVideos } from "services/api"

import ListItem from "components/list_item"
import Playing from "components/playing";

export default function Home() {
  const [trending, setTrending] = useState<VideoItem[]>([]);

  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<VideoItem[]>([]);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    searchVideos(query).then(setSearch)
  }

  useEffect(() => {
    getTrending().then(setTrending)
  }, [])

  const videos = useMemo(() => query ? search : trending, [query, search, trending])

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Head>
        <title>unrel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="border-gray-200 border-b flex items-center p-4 gap-4">
        <form className="flex-1 bg-slate-100 h-10 rounded-lg" onSubmit={handleSearch}>
          <input 
            type="search"
            name="q"
            className="bg-transparent p-2 outline-none w-full"
            value={query} onChange={e => setQuery(e.target.value)}
          />
        </form>
      </div >


      <ul className="overflow-auto flex-1 pb-16">
        {videos.map((item) => (
          <ListItem item={item} key={item.videoId} />
        ))}
      </ul>

      <Playing />
    </div >
  )
}
