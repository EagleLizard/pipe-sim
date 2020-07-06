
import '../edit-drawer/edit-drawer.scss';
import React, { useState, useEffect } from 'react';
import { 
  Add as AddIcon,
  Timeline as TimelineIcon,
  CropFree as CropFreeIcon,
  Block as BlockIcon,
  PanTool as PanToolIcon,
} from '@material-ui/icons';

import { EDIT_ACTIONS, EditActions } from '../edit-actions';
import { DrawerItem } from '../drawer-item';

export interface EditDrawerItem extends DrawerItem {
  editType: keyof EditActions;
}

const EDIT_DRAWER_ITEMS: EditDrawerItem[] = [
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

interface EditDrawerProps {
  onSelect: (selected: EditDrawerItem) => unknown;
  selected: EditDrawerItem;
}

export function EditDrawer(props: EditDrawerProps) {
  const [ selected, setSelected ] = useState<EditDrawerItem>();

  const handleClick = (selected: EditDrawerItem) => {
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
