import React from 'react';
import { Button, Txt, Box } from 'rendition';
import styled from 'styled-components';
import FaHome from 'react-icons/lib/fa/home';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaLightBulbO from 'react-icons/lib/fa/lightbulb-o';

const FaLightBulb = styled(FaLightBulbO)`
  margin: -0.2em 0.4em 0 0;
`;

export default () => (
  <Box pt={2} pb={[3, 4]} pl={3}>
    <Button py={2} px={0} m={0} quartenary square color="tertiary.main">
      <FaHome />
    </Button>
    <Button py={[0, 1, 2]} px={3} ml={2} quartenary color="tertiary.main">
      <FaChevronLeft />
      <Txt.span ml={2} fontSize={[0, 1]}>
        Back
      </Txt.span>
    </Button>
    <Txt.span ml={4} fontSize={[2, 3]} color="tertiary.main">
      <FaLightBulb />
      Lighting
    </Txt.span>
  </Box>
);
