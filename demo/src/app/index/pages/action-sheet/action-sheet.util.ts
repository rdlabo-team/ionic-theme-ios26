export const sheetConfig = () => ({
  header: 'Actions',
  subHeader: 'Action Sheet',
  buttons: [
    {
      text: 'Delete',
      role: 'destructive',
      icon: 'trash-outline',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      icon: 'share-outline',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ],
});
