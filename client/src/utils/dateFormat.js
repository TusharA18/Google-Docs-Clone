export const formatDate = (date) => {
   let d = date.toString().substr(4, 11);

   let formattedDate = d.slice(3, 6) + " " + d.slice(0, 3) + " " + d.slice(6);

   return formattedDate;
};
