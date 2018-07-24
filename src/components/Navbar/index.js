import React, { Component } from 'react';
import moment from 'moment';
import {
  Box,
  Txt,
  Flex,
} from 'rendition';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.getDate(),
      time: this.getTime(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateDateTime(), 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Get the current date i.e Friday 20, July, 2018.
   *
   * @returns {string} Current date.
   */
  getDate = () => moment().format('dddd D, MMMM, YYYY');

  /**
   * Get the current time i.e 10:54pm.
   *
   * @returns {string} Current time.
   */
  getTime = () => moment().format('h:mm a');

  updateDateTime = () => {
    this.setState({
      date: this.getDate(),
      time: this.getTime(),
    });
  };

  render() {
    const { date, time } = this.state;
    return (
      <Box>
        <Flex direction={['column', 'row']} bg="text.dark" alignItems="center">
          <Box width={1} pl={3} flex={2}>
            <Txt.p color="gray.light" fontSize={[0, 1]}>
              {date}
            </Txt.p>
          </Box>
          <Box width={1} flex={1}>
            <Txt.p color="gray.light" align="center" fontSize={[0, 1]}>
              {time}
            </Txt.p>
          </Box>
          <Flex width={1} pr={3} justifyContent="flex-end" flex={2}>
            <Txt.p color="gray.light" fontSize={[0, 1]}>
              Name Surname
            </Txt.p>
          </Flex>
        </Flex>
      </Box>
    );
  }
}
