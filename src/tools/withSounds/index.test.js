import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withSounds from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('withSounds', function () {

  it('Should create a component with sounds by provider', function () {
    // These sounds are provided
    const sounds = { thesounds: 1 };

    // A provider mock
    class Provider extends React.Component {
      static childContextTypes = {
        sounds: PropTypes.object
      }
      getChildContext () {
        return { sounds };
      }
      render () {
        return this.props.children;
      }
    }

    const MyComp = (props) => {
      // Assert the provided sounds are the same
      expect(props.sounds).to.equal(sounds);
      return <div />;
    };
    const MyCompWithSounds = withSounds()(MyComp);

    mount(
      <Provider>
        <MyCompWithSounds />
      </Provider>
    );
  });

});
