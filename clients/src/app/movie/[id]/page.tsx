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
  production_companies?: { id: number; name: string; logo_path?: string }[];
}

export default function Info() {
  const [info, setInfo] = useState<InfoData | null>(null);
  const [omdbId, setOmdbId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params?.id?.toString();

  useEffect(() => {
    if (id) {
      const fetchInfo = async () => {
        try {
          setIsLoading(true);
          const infoResult = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_URL}&language=en-US`
          );
          setInfo(infoResult.data);
        } catch (error) {
          console.error("Error fetching movie info:", error);
        } finally {
          setIsLoading(false);
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
    if (rating >= 8) return "bg-gradient-to-br from-emerald-400 to-green-600";
    if (rating >= 6) return "bg-gradient-to-br from-yellow-400 to-amber-600";
    return "bg-gradient-to-br from-red-400 to-rose-600";
  };

  const getPopularityBadge = (popularity: number) => {
    if (popularity > 500) return { text: "TRENDING", color: "bg-gradient-to-r from-red-500 to-orange-500" };
    if (popularity > 200) return { text: "POPULAR", color: "bg-gradient-to-r from-green-500 to-emerald-500" };
    return { text: "AVERAGE", color: "bg-gradient-to-r from-gray-500 to-slate-500" };
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Dynamic backdrop */}
      {info?.backdrop_path && (
        <div className="absolute inset-0 z-0">
          <Image
            src={`https://image.tmdb.org/t/p/w1280${info.backdrop_path}`}
            alt=""
            fill
            className="object-cover opacity-10 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
        </div>
      )}

      <Header />

      {isLoading ? (
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-pink-500/30 border-b-pink-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Loading movie details...
            </h2>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      ) : info ? (
        <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 pb-10">
          <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Movie Poster - Left Column */}
            <div className="w-full lg:w-auto flex-shrink-0 group relative">
              <div className="relative transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className={`relative transition-all duration-700 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
                    alt={info.title}
                    width={380}
                    height={570}
                    className="rounded-2xl shadow-2xl object-cover ring-1 ring-white/20 w-full max-w-[380px] mx-auto"
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Rating Badge */}
              <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full ${getRatingColor(info.vote_average)} flex items-center justify-center shadow-lg border-4 border-slate-900/50`}>
                <span className="text-white font-bold text-lg">
                  {info.vote_average.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Info Section - Right Column */}
            <div className="flex-1 max-w-3xl space-y-6 md:space-y-8">
              {/* Title Section */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
                    {info.title}
                  </h1>
                  {getPopularityBadge(info.popularity) && (
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${getPopularityBadge(info.popularity).color} shadow-lg animate-pulse`}>
                      {getPopularityBadge(info.popularity).text}
                    </span>
                  )}
                </div>
                
                {info.original_title !== info.title && (
                  <p className="text-base md:text-lg text-gray-400 italic">
                    Original: {info.original_title}
                  </p>
                )}
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                  <span className={`text-sm font-medium ${info.vote_average >= 8 ? 'text-emerald-400' : info.vote_average >= 6 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {info.vote_average.toFixed(1)}/10
                  </span>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                  <span className="text-sm font-medium text-white">
                    {info.original_language.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                  <span className="text-sm font-medium text-white">
                    {new Date(info.release_date).getFullYear()}
                  </span>
                </div>
                
                {info.runtime && (
                  <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                    <span className="text-sm font-medium text-white">
                      {formatRuntime(info.runtime)}
                    </span>
                  </div>
                )}
                
                {info.genres && info.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {info.genres.slice(0, 3).map(genre => (
                      <span key={genre.id} className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded-full border border-purple-800/50">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Overview */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 md:mb-4 text-purple-300">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {info.overview || "No overview available."}
                </p>
              </div>

              {/* Detailed Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="backdrop-blur-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-xl p-4 md:p-6 hover:scale-[1.02] transition-all duration-300 shadow-xl">
                  <h4 className="text-purple-300 font-semibold mb-2 text-sm md:text-base">Popularity Score</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-white">{info.popularity.toFixed(0)}</p>
                      <p className="text-xs md:text-sm text-gray-400">Trending Points</p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 rounded-xl p-4 md:p-6 hover:scale-[1.02] transition-all duration-300 shadow-xl">
                  <h4 className="text-blue-300 font-semibold mb-2 text-sm md:text-base">Release Info</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-bold text-white">
                        {new Date(info.release_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">Release Date</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Companies */}
              {info.production_companies && info.production_companies.length > 0 && (
                <div className="backdrop-blur-lg bg-slate-800/20 border border-white/10 rounded-xl p-6 shadow-xl">
                  <h4 className="text-white/80 font-semibold mb-3 text-sm md:text-base">Production Companies</h4>
                  <div className="flex flex-wrap gap-4">
                    {info.production_companies.filter(company => company.logo_path).slice(0, 4).map(company => (
                      <div key={company.id} className="bg-white/5 p-2 rounded-lg flex items-center h-12">
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          width={100}
                          height={40}
                          className="object-contain h-full w-auto max-w-[100px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Play Button */}
              <div className="flex justify-center lg:justify-start pt-4 md:pt-6">
                <Link href={`/play/${omdbId}`} className="w-full sm:w-auto">
                  <button 
                    className="group relative w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white font-bold text-base sm:text-lg rounded-full overflow-hidden shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                    disabled={!omdbId}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <svg className="w-5 h-5 text-white group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span className="tracking-wide">
                        {omdbId ? "WATCH NOW" : "STREAMING UNAVAILABLE"}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center space-y-6 p-6 bg-slate-900/80 rounded-xl border border-slate-800 mx-4">
            <div className="text-red-400">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Movie not found
            </h2>
            <p className="text-gray-400">
              We couldn't retrieve details for this movie.
            </p>
            <Link href="/" className="inline-block mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition-colors duration-300">
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}