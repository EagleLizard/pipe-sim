
import React, { useState, useEffect } from 'react';
import { 
  Add as AddIcon,
  Timeline as TimelineIcon,
  CropFree as CropFreeIcon,
  Block as BlockIcon,
  PanTool as PanToolIcon,
} from '@material-ui/icons';

import { EDIT_ACTIONS } from '../edit-actions';

const EDIT_DRAWER_ITEMS = [
  {
    editType: EDIT_ACTIONS.SELECT,
    icon: AddIcon,
    label: 'Select',
  },
  {
    editType: EDIT_ACTIONS.LINE,
    icon: TimelineIcon,
    label: 'Edit Route',
  },
  {
    editType: EDIT_ACTIONS.MARQUEE,
    icon: CropFreeIcon,
    label: 'Multi Select',
  },
  {
    editType: EDIT_ACTIONS.DELETE,
    icon: BlockIcon,
    label: 'Delete',
  },
  {
    editType: EDIT_ACTIONS.PAN,
    icon: PanToolIcon,
    label: 'Pan',
  },
];

import '../edit-drawer/edit-drawer.scss';

export function EditDrawer(props) {
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
        EDIT_DRAWER_ITEMS.map((editItem, idx) => {
          let editItemClass;
          editItemClass = 'add-item-button';
          if(editItem.editType === (selected && selected.editType)) {
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
