import withContent from './withContent';
import Api from './components/Api';

export default (props) => {
  return withContent({
    App: Api,
    appProps: props,
  });
};
