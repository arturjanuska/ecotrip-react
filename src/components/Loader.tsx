import '../styles/loader.css';

// Block-level loading indicator for parts of the form waiting on data.
const Loader = () => (
  <div className="loader" role="status" aria-label="loading">
    <div className="loader__spinner" />
  </div>
);

export default Loader;
