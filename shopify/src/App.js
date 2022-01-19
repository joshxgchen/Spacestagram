import React, { useState, useEffect } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Frame, TextContainer,Heading, Layout, Card} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Cards from "./routes/Cards";
import Weekly from "./routes/Weekly";
import Loader from "./routes/Loader";
import "./App.css"
import InfiniteScroll from 'react-infinite-scroll-component';

let today = new Date();
today = today.toISOString().split('T')[0];
let monthBefore = new Date().setDate(new Date().getDate() - 7)
monthBefore = new Date(monthBefore)
monthBefore = monthBefore.toISOString().split('T')[0];

const nasaApiKey = "GWKXvKnHm9amnqFebTSXIVhaCzdyVygea1YxEmlM";
const apiCallCount = 30;
const dayPhoto2 = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&start_date=${monthBefore}&end_date=${today}`;
const dayPhoto = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&count=${apiCallCount}`;


export default function Photo() {
  const [photoData, setPhotoData] = useState();
  const [photoData2, setPhotoData2] = useState();
  useEffect(() => {
    fetchPhoto();
    fetchPhoto2();
    async function fetchPhoto() {
      const res = await fetch(
        dayPhoto
      );
      const data = await res.json();
      setPhotoData(data);
    }
    async function fetchPhoto2() {
      const res = await fetch(
        dayPhoto2
      );
      const data = await res.json();
      setPhotoData2(data);
    }
  }, []);
  const [imageOfTheDay, setImageOfTheDay] = useState();
	const [imageTitle, setImageTitle] = useState();
	const [imageInfo, setImageInfo] = useState();
	const [authorCredit, setAuthorCredit] = useState();
  const [date, setDate] = useState();

	// API call to "APOD," astronomy photo of the day.
	const makeAPICall2 = () =>
		fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
			.then((response) => response.json())
			.then((results) => {
				setImageOfTheDay(results.url);
				setImageTitle(results.title);
				setImageInfo(results.explanation);
				setAuthorCredit(results.copyright);
        setDate(results.date);
			});

	useEffect(() => {
		makeAPICall2();
	}, []);
  window.addEventListener("scroll", () => {
    const { scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight*1.2 <= clientHeight) {
      window.location.reload();
    }
  });

  if (!photoData) return <Loader />;

  return (
    <div className="nasa-photo">

			<h1 class="featured-photo-text">Spacestagram</h1>
			<img
				id='homepage-wrapper'
				src={imageOfTheDay}
				alt='NASA footage of the day'
			/>
			<h2 className='imageTitle'>{imageTitle }</h2>
      <h3 className = 'imageTitle2'>{"Created by: " + authorCredit+" | " + date + " |"+" Photo of The Day"}</h3>
			<div className='featuredImage'>
				<h6 className='imageInfo'>{imageInfo}</h6>
			</div>
      
      <AppProvider i18n={enTranslations}>
        <Frame>
          
          <Weekly photoData={photoData2}/>
        </Frame>
        <Frame>
          
          <Cards photoData={photoData}/>
        </Frame>
      </AppProvider>
      <TextContainer>
    <Heading>Created by Josh Chen</Heading>
      <h4 >
      Shopify is the easiest way to sell your products in person. Available
      for iPad, iPhone, and Android.
      </h4 >
    </TextContainer>


    </div>
  );
}