import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Ratingg from '../Components/Rating';

const Container = styled.div`
font-size: 12px;
min-height: 350px;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});

  width: 200px;

  height: 300px;

  margin-right: 20px;

  background-size:cover;

  border-radius: 4px;

  transition:all 0.1s linear 0s;  
`;
const Rating = styled.span`
font-size: 15px;
    position: absolute;
    bottom: 5px;
    right: 25px;
    opacity: 0;
    transition: all 0.1s linear 0s;
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;

  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.3;
    }

    ${Rating} {
      opacity: 1;
    }
  }


  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  &:hover {
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    background-color: var(--color-primary);
    z-index: -99;
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }



`;

const Title = styled.span`
  // display: block;
  // margin-bottom: 3px;
  font-size:12px;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 3rem;

`;
const Year = styled.span`
  // font-size: 10px;
  // color: rgba(255, 255, 255, 0.5);

  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--color-primary);

  margin-left:40px;

  
`;

const RatingsWrapper = styled.div`
  
  position: relative;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--color-primary);

  ${Container}:hover & {
    color: var(--color-primary-lighter);
  }

  
  
`;




const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      
      <ImageContainer>
        <Image
          bgUrl={
            `https://image.tmdb.org/t/p/w300${imageUrl}`
          }
        />
        
        <Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating}/10
        </Rating>
      </ImageContainer>
      <RatingsWrapper>
      <Title>
        {title.length > 18 ? `${title.substring(0, 8)}...` : title}
      </Title>
      <Year>
        <Ratingg number = {rating/2}/>        
       </Year>
       </RatingsWrapper>
    </Container>
  </Link>
  
  
);
Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};
export default Poster;
