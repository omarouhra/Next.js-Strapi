import axios from "axios";
function post({ post, posts }) {
  const otherPosts = posts.filter(article => article.id != post.id);
  console.log("thes are other posts", otherPosts);
  return (
    <div>
      <h1>{post.title} </h1>
      <h2>{post.description}</h2>
      <p>{post.content}</p>
      {post.image ?(<img src={post.image.name} alt='' />):<p>no image founded</p>}
      <h2> more Projects</h2>
      {otherPosts.map(post => (
        <div key={post.id}>
          <a href={`/${post.id}`}>{post.title}</a>
        </div>
      ))}
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
  const posts = await axios.get("http://localhost:1337/posts");

  return {
    props: {
      post: post.data,
      posts: posts.data,
    },
  };
}
