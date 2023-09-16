import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  return localStorage.getItem("token");
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://witty-gold-pigeon.cyclic.cloud/api/v1",
    prepareHeaders: (headers) => {
      const token = getBearerToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["todo"],

  endpoints: (builder) => ({
    //authantication apies
    loginAuth: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    registerAuth: builder.mutation({
      query: (registerData) => ({
        url: "/auth/signup",
        method: "POST",
        body: registerData,
      }),
    }),

    Getboards: builder.query({
      query: () => ({
        url: "/boards",
        method: "GET",
      }),
      providesTags: ["todo"],
    }),

    removeBoards: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),

    editBoards: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/boards/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    getSection: builder.query({
      query: (id) => `/boards/${id}`,
      providesTags: ["todo"],
    }),

    addBoard: builder.mutation({
      query: (data) => ({
        url: "/boards",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
      // async onQueryStarted(args,{queryFulfilled,dispatch}){
      //   try{
      //    const {data:addData}=await queryFulfilled;
      //   //  console.log(addData)
      //    dispatch(
      //     apiSlice.util.updateQueryData('GetLeave',undefined,(draft)=>{
      //       draft?.push(addData)
      //     })
      //    )
      //   }
      //   catch(error){
      //     console.log(error)
      //   }
      // }
    }),
    addSection: builder.mutation({
      query: ({ id, data }) => ({
        url: `/boards/${id}/sections`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    removeSection: builder.mutation({
      query: ({ id, id2 }) => ({
        url: `/boards/${id}/sections/${id2}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    editSection: builder.mutation({
      query: ({ id, id2, data }) => ({
        // Uncomment this part to make the actual API request
        url: `/boards/${id}/sections/${id2}`,
        method: "PUT",
        body: data, // Send the data object as the request body
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetboardsQuery,
  useRemoveBoardsMutation,
  useEditBoardsMutation,
  useGetSectionQuery,
  useAddBoardMutation,
  useAddSectionMutation,
  useLoginAuthMutation,
  useRegisterAuthMutation,
  useRemoveSectionMutation,
  useEditSectionMutation,
} = apiSlice;
