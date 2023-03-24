import NotFound from "../../assets/images/404 Error-amico.svg";
export default function NotFoundComp() {
  return (
   <figure className="vh-100">
    <img src={NotFound} className="img-404" alt="not Found" />
   </figure>
  )
}
