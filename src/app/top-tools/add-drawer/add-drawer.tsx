
import './add-drawer.scss';
import React, { useState, useEffect } from 'react';
import { Tram, AccountBalance, SwapVert, TrendingFlat, Opacity, SvgIconComponent } from '@material-ui/icons';

import { ENTITY_ENUM, EntityEnum } from '../../../world/entities/entity-enum';
import { DrawerItem } from '../drawer-item';

export interface AddDrawerItem extends DrawerItem {
  entityType: keyof EntityEnum;
}

const ADD_DRAWER_ITEMS: AddDrawerItem[] = [
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

interface AddDrawerProps {
  onSelect: (selected: AddDrawerItem) => unknown;
  selected: AddDrawerItem;
}

export function AddDrawer(props: AddDrawerProps) {
  const [ selected, setSelected ] = useState<AddDrawerItem>();

  const handleClick = (selected: AddDrawerItem) => {
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
