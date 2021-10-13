import axios from "axios";
function post({ post }) {
  return (
    <div>
      <h1>{post.title} </h1>
      <h2>{post.description}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default post;


// * static Side generated dynamic routing
// export async function getStaticProps({ params }) {
//   const post = await axios.get(`http://localhost:1337/posts/${params.id}`);

//   return {
//     props: {
//       post: post.data,
//     },
//   };
// }
// export async function getStaticPaths() {
//   const posts = await axios.get("http://localhost:1337/posts");

//   const paths = posts.data.map(post => ({
//     params: { id: post.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// * Server Side generated dynamic routing
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const post = await axios.get(`http://localhost:1337/posts/${id}`);

  return {
    props: {
      post: post.data,
    },
  };
}
