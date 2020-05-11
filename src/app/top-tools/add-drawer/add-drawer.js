
import React, { useState, useEffect } from 'react';
import { Tram, AccountBalance, SwapVert, TrendingFlat, Opacity } from '@material-ui/icons';

import { ENTITY_ENUM } from '../../../world/entities/entity-enum';

const ADD_DRAWER_ITEMS = [
  // {
  //   entityType: ENTITY_ENUM.STATION,
  //   icon: AccountBalance,
  //   label: 'Station',
  // },
  // {
  //   entityType: ENTITY_ENUM.ENGINE,
  //   icon: Tram,
  //   label: 'Tram',
  // },
  // {
  //   entityType: ENTITY_ENUM.ROUTE,
  //   icon: SwapVert,
  //   label: 'New Route',
  // }
  {
    entityType: ENTITY_ENUM.PIPE,
    icon: TrendingFlat,
    label: 'Pipe',
  },
  {
    entityType: ENTITY_ENUM.RESERVOIR,
    icon: Opacity,
    label: 'Resevoir',
  },
];

import './add-drawer.scss';

export function AddDrawer(props) {
  const [ selected, setSelected ] = useState();

  const handleClick = (selected) => {
    props.onSelect(selected);
  };

  useEffect(() => {
    setSelected(props.selected);
  }, [ props.selected ]);

  return (
    <div
      className="add-drawer">
      {
        ADD_DRAWER_ITEMS.map((editItem, idx) => {
          let editItemClass;
          editItemClass = 'add-item-button';
          if(editItem.entityType === (selected && selected.entityType)) {
            editItemClass = `${editItemClass} selected`;
          }
          return (
            <div
              key={idx}
              className={editItemClass}
              onClick={e => handleClick(editItem)}>
              <editItem.icon />
            </div>
          );
        })
      }
    </div>
  );
}
