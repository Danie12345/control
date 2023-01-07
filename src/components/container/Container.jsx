import PropTypes from 'prop-types';
import './Container.css';

function Container(props) {
  const { children } = props;
  return (
    <div className="container">
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Container;
