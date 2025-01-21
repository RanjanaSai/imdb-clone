/* eslint-disable react/jsx-key */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import genreids from "../Utility/genre";

function Watchlist({ watchlist, setWatchList, handleRemoveFromWatchlist }) {
    const [search, setSearch] = useState('')
    const [genreList, setGenreList] = useState(["All Genres"])

    const [currGenre, setCurrGenre] = useState("All Genre")

    let handleSearch = (e) => {
        setSearch(e.target.value);
    };
    let handleFilter = (genre) => {
        setCurrGenre(genre);
    };

    // methods for sorting watchlist based on ratings
    let sortIncreasing = () => {
        let sortedIncreasing = watchlist.sort((movieA, movieB) => {
            return movieA.vote_average - movieB.vote_average;
        });
        setWatchList([...sortedIncreasing]);
    };
    let sortDecreasing = () => {
        let sortedDecreasing = watchlist.sort((movieA, movieB) => {
            return movieB.vote_average - movieA.vote_average;
        });
        setWatchList([...sortedDecreasing]);
    };
    //----------------------------------------------------------------------------
    useEffect(() => {
        let temp = watchlist.map((movieObj) => {
            return genreids[movieObj.genre_ids[0]];
        });
        temp = new Set(temp)
        setGenreList(["All Genre", ...temp]);
        console.log(temp);
    }, [watchlist]);

    return (
        <>
            <div className="flex justify-center flex-wrap m-4">
                {genreList.map((genre) => {
                    return (
                        <div
                            onClick={() => handleFilter(genre)}
                            className={
                                currGenre == genre
                                    ? "flex justify-center items-center h-[3rem] w-[9rem] text-white bg-blue-400 rounded-xl font-bold mx-4"
                                    : "flex justify-center items-center h-[3rem] w-[9rem] text-white bg-gray-400/50 rounded-xl font-bold mx-4"
                            }
                        >
                            {genre}
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center my-4">
                <input
                    onChange={handleSearch}
                    value={search}
                    type="text"
                    placeholder="Search Movies"
                    className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
                ></input>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
                <table className="w-full text-gray-500 text-center">
                    <thead className="border-b-2">
                        <tr>
                            <th>Name</th>
                            {/* sorting basedon rating calling sortIncreasing sortDecreasing*/}
                            <th className="flex justify-center">
                                <div onClick={sortIncreasing} className="p-2">
                                    <i className="fa-solid fa-arrow-up"></i>
                                </div>
                                <div className="p-2">Ratings</div>
                                <div onClick={sortDecreasing} className="p-2">
                                    <i className="fa-solid fa-arrow-down"></i>
                                </div>
                            </th>
                            {/* ------------------------------------------------------------------------------ */}
                            <th>Popularity</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watchlist
                            .filter((movieObj) => {
                                if (currGenre == "All Genre") {
                                    return true;
                                } else {
                                    return genreids[movieObj.genre_ids[0]] == currGenre;
                                }
                            })
                            .filter((movieObj) => {
                                return movieObj.title
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                            })
                            .map((movieObj) => {
                                return (
                                    <tr className="border-b-2">
                                        <td className="flex items-center px-6 py-4">
                                            <img
                                                className="h-[6rem] w-[10rem]"
                                                src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                                            />
                                            <div className="mx-10">{movieObj.original_title}</div>
                                        </td>

                                        <td>{movieObj.vote_average}</td>
                                        <td>{movieObj.popularity}</td>
                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                        <td onClick={() => handleRemoveFromWatchlist(movieObj)} className="text-red-800">Delete</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Watchlist;
