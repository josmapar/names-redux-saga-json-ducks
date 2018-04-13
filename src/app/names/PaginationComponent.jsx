import React from 'react';
import { Pagination } from 'react-bootstrap';
import { compose, defaultProps } from 'recompose';
import PropTypes from 'prop-types';

const LeftPags = (actPag, numberMaxNeighbors, onChangePag) => {
  const diff = actPag - numberMaxNeighbors;
  const ret = [];

  if(diff >= 3) {
    ret.push(<Pagination.Item onClick={() => onChangePag(1)} className="pagination-link" key={1}>1</Pagination.Item>);
    ret.push(<Pagination.Ellipsis className="pagination-link" key={2} />);
    for(let i = diff; i < actPag; i++) {
      ret.push(<Pagination.Item onClick={() => onChangePag(i)} className="pagination-link" key={i}>{i}</Pagination.Item>);
    }
  } else {
    for(let i = 1; i < actPag; i++) {
      ret.push(<Pagination.Item onClick={() => onChangePag(i)} className="pagination-link" key={i}>{i}</Pagination.Item>);
    }
  }
  ret.push(<Pagination.Item className="pagination-link"
              active key={actPag}>{actPag}</Pagination.Item>);
  return ret;
};

const RightPags = (actPag, totalPags, numberMaxNeighbors, onChangePag) => {
  const diff = actPag + 1 + numberMaxNeighbors;
  const ret = [];
  if(diff < totalPags) {
    for(let i = actPag + 1; i < diff; i++) {
      ret.push(<Pagination.Item onClick={() => onChangePag(i)} className="pagination-link" key={i}>{i}</Pagination.Item>);
    }
    ret.push(<Pagination.Ellipsis className="pagination-link" key={totalPags-1} />);
    ret.push(<Pagination.Item onClick={() => onChangePag(totalPags)} className="pagination-link" key={totalPags}>{totalPags}</Pagination.Item>);
  } else {
    for(let i = actPag + 1; i <= totalPags; i++) {
      ret.push(<Pagination.Item onClick={() => onChangePag(i)} className="pagination-link" key={i}>{i}</Pagination.Item>);
    }
  }
  return ret;
};

const enhance = compose(
  defaultProps({
    numberMaxNeighbors: 2
  })
);
const PaginationComponent = ({ actPag, totalPags, numberMaxNeighbors
  , onChangePag, onPrev, onNext, style }) => (
  <Pagination style={style}>
    <Pagination.Prev onClick={onPrev} className="pagination-link-prev" 
      disabled={actPag===1}>{'←'} Previous</Pagination.Prev>
    
    {LeftPags(actPag, numberMaxNeighbors, onChangePag)}
    {RightPags(actPag, totalPags, numberMaxNeighbors, onChangePag)}
    <Pagination.Next className="pagination-link-next"
      onClick={onNext}
      disabled={actPag===totalPags}>Next {'→'}</Pagination.Next>
  </Pagination>    
);
PaginationComponent.propTypes = {
  actPag: PropTypes.number.isRequired,
  totalPags: PropTypes.number.isRequired,
  numberMaxNeighbors: PropTypes.number,
  onChangePag: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};
export default enhance(PaginationComponent);
