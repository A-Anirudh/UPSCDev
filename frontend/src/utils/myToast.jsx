import toast from "react-hot-toast";

export const toastSuccess=(value)=>toast.success(value,{
    style: {
      backgroundColor:'var(--card-1000)',
      padding: '16px',
      color: 'var(--text-25)',
    },
    iconTheme: {
      primary: '#1216ed',
      secondary: '#e6e6fe',
    },
  });


  export const toastLoading =(isLoading )=> toast.promise(
    isLoading,
     {
       loading: 'Saving...',
       success: <b>Settings saved!</b>,
       error: <b>Could not save.</b>,
     }
   );