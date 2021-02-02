import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const HiName = styled.h1`
  color: #000;
`;

export default function Quiz() {
  const queryString = useRouter().query;
  const name = queryString.name ? `Hi ${queryString.name}!` : 'Uops! No name...=z';
  return (
    <HiName>{name}</HiName>
  );
}
