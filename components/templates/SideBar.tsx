import React from 'react';
import CategoryList from '../Organisms/CategoryList';
import ProfileCard from '../Organisms/ProfileCard';

const SideBar = (): FC => (
  <>
    <ProfileCard />
    <CategoryList />
  </>
);

export default SideBar;
