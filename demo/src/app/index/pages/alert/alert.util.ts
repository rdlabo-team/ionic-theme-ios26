export const alertUtil = () => ({
  header: 'A Short Title Is Best',
  subHeader: 'A Sub Header Is Optional',
  message: 'A message should be a short, complete sentence.',
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'destructive',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ],
});
