import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Rating from "../../Components/Rating";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import Cast from "./Cast/Cast";
import Video from "./Video/Video";
import Favorite from "./Sections/Favorite";
import Reservation from "../Reservation/Reservation";

const Container = styled.div`
  height: calc(100vh - 50px);

  width: 100%;

  position: relative;

  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  background-image: url(${(props) => props.bgImage});

  background-position: center center;

  background-size: cover;

  filter: blur(0px);

  opacity: 0.5;

  z-index: 0;
`;

const Content = styled.div`
  display: flex;

  width: 100%;

  position: relative;

  z-index: 1;

  height: 100%;
`;

const Cover = styled.div`
  width: 30%;

  background-image: url(${(props) => props.bgImage});

  background-position: center center;

  background-size: cover;

  height: 100%;

  border-radius: 5px;
`;
const Data = styled.div`
  width: 70%;

  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 200;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: flex;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;

  opacity: 0.9;

  line-height: 1.5;

  width: 50%;
`;
const RatingsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-top: 10px;
`;

const RatingNumber = styled.p`
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 700;
  color: var(--color-primary);
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  margin-top: 10px;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: -73px;
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DetailPresenter = ({
  result,
  loading,
  error,
  castResult,
  isMovie,
  video,
}) => {
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>

      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.title ? result.title : result.original_name} | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />

      <Content>
        <Cover
          bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`}
        />
        <Data>
          <Title>
            {isMovie
              ? result.title //movie : title, tv show : name
              : result.name}
            <Reservation video={video.results[0]} />
          </Title>

          <ItemContainer>
            <Item>
              {isMovie
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>

            <Divider>•</Divider>

            <Item>
              {isMovie ? result.runtime : result.episode_run_time[0]} min
            </Item>

            <Divider>•</Divider>

            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>

            <Favorite
              isMovie={isMovie}
              movieInfo={result}
              movieId={parseInt(result.id)}
              userFrom={localStorage.getItem("userId")}
            />

            <RatingsWrapper>
              <Rating number={result.vote_average / 2} />
              <RatingNumber>{result.vote_average}</RatingNumber>
            </RatingsWrapper>
          </ItemContainer>

          <Overview>{result.overview}</Overview>

          <Heading>The Cast</Heading>
          <Cast cast={castResult.cast} />

          <ButtonsWrapper>
            <Video video={video.results[0]} />
          </ButtonsWrapper>
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  castResult: PropTypes.object,
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool,
};
export default withRouter(DetailPresenter);
