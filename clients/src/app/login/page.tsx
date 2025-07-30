"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

interface InfoData {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number | 0;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export default function Info() {
  const [info, setInfo] = useState<InfoData | null>(null);
  const [omdbId, setOmdbId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id?.toString();

  useEffect(() => {
    if (id) {
      const fetchInfo = async () => {
        try {
          setLoading(true);
          const infoResult = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_URL}&language=en-US`
          );
          setInfo(infoResult.data);
        } catch (error) {
          console.error("Error fetching movie info:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchInfo();
    }
  }, [id]);

  useEffect(() => {
    const fetchOmdb = async () => {
      if (info?.title) {
        try {
          const result = await axios.get(`/route/router2?title=${info.title}`);
          setOmdbId(result.data);
        } catch (error) {
          console.error("Error fetching OMDB ID:", error);
        }
      }
    };
    fetchOmdb();
  }, [info]);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "bg-emerald-500";
    if (rating >= 6) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getPopularityBadge = (popularity: number) => {
    if (popularity > 500) return { text: "TRENDING", color: "from-red-500 to-orange-500" };
    if (popularity > 200) return { text: "POPULAR", color: "from-green-500 to-emerald-500" };
    return { text: "AVERAGE", color: "from-gray-500 to-slate-500" };
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full mb-4"></div>
          <p className="text-purple-200">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
          <p className="text-slate-400 mb-6">We couldn't find the movie you're looking for.</p>
          <Link href="/" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background with gradient and blur */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {info.backdrop_path && (
          <div className="absolute inset-0">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${info.backdrop_path}`}
              alt=""
              fill
              className="object-cover opacity-20 blur-md"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Poster Column */}
          <div className="w-full lg:w-1/3 xl:w-1/4 flex justify-center">
            <div className="relative group">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
                  alt={info.title}
                  width={400}
                  height={600}
                  className="w-full h-auto"
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Rating Badge */}
              <div className={`absolute -top-4 -right-4 w-14 h-14 rounded-full ${getRatingColor(info.vote_average)} flex items-center justify-center shadow-lg border-4 border-slate-900`}>
                <span className="text-white font-bold">
                  {info.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    {info.title}
                  </h1>
                  {info.popularity > 200 && (
                    <span className={`bg-gradient-to-r ${getPopularityBadge(info.popularity).color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {getPopularityBadge(info.popularity).text}
                    </span>
                  )}
                </div>

                {info.original_title !== info.title && (
                  <p className="text-slate-400 italic">
                    Original Title: {info.original_title}
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-slate-800/50 px-3 py-1 rounded-full text-sm">
                  {info.original_language.toUpperCase()}
                </div>
                <div className="bg-slate-800/50 px-3 py-1 rounded-full text-sm">
                  {new Date(info.release_date).getFullYear()}
                </div>
                {formatRuntime(info.runtime) && (
                  <div className="bg-slate-800/50 px-3 py-1 rounded-full text-sm">
                    {formatRuntime(info.runtime)}
                  </div>
                )}
                {info.genres?.map(genre => (
                  <div key={genre.id} className="bg-purple-900/50 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                <p className="text-slate-300 leading-relaxed">
                  {info.overview || "No overview available."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={`/play/${omdbId}`}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${omdbId ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-700 cursor-not-allowed'}`}
                >
                  {omdbId ? 'Watch Now' : 'Streaming Unavailable'}
                </Link>
                <button className="px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 font-medium transition-all">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}