import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Int'];
  filename: Scalars['String'];
  filepath: Scalars['String'];
  ocr: Scalars['JSONObject'];
  event: Scalars['String'];
  noteId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createNote: NoteResponse;
  updateNote: NoteResponse;
  deleteNote: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  UploadImage: UploadImageResponse;
};


export type MutationCreateNoteArgs = {
  input: NoteInput;
};


export type MutationUpdateNoteArgs = {
  id: Scalars['Int'];
  input: NoteInput;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUploadImageArgs = {
  event?: Maybe<Scalars['String']>;
  noteId: Scalars['Int'];
  file: Scalars['Upload'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
  isPublic: Scalars['Boolean'];
  creatorId: Scalars['Float'];
  creator: User;
  images?: Maybe<Array<Image>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
  canEdit: Scalars['Boolean'];
};

export type NoteInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type NoteResponse = {
  __typename?: 'NoteResponse';
  note?: Maybe<Note>;
  errors?: Maybe<Array<FieldError>>;
};

export type PaginatedNotes = {
  __typename?: 'PaginatedNotes';
  notes: Array<Note>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  notes: PaginatedNotes;
  note?: Maybe<Note>;
  me?: Maybe<User>;
  images: Array<Image>;
};


export type QueryNotesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryNoteArgs = {
  id: Scalars['Int'];
};


export type QueryImagesArgs = {
  noteId: Scalars['Int'];
};


export type UploadImageResponse = {
  __typename?: 'UploadImageResponse';
  image?: Maybe<Image>;
  error?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorResponseFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserCoreFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'username'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorResponseFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserCoreFragment
    )> }
  ) }
);

export type CreateNoteMutationVariables = Exact<{
  input: NoteInput;
}>;


export type CreateNoteMutation = (
  { __typename?: 'Mutation' }
  & { createNote: (
    { __typename?: 'NoteResponse' }
    & { note?: Maybe<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'isPublic' | 'creatorId' | 'title' | 'text'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorResponseFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserCoreFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorResponseFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserCoreFragment
    )> }
  ) }
);

export type UpdateNoteMutationVariables = Exact<{
  input: NoteInput;
  id: Scalars['Int'];
}>;


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateNote: (
    { __typename?: 'NoteResponse' }
    & { note?: Maybe<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'isPublic' | 'creatorId' | 'title' | 'text' | 'updatedAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UploadImageMutationVariables = Exact<{
  image: Scalars['Upload'];
  noteId: Scalars['Int'];
  event?: Maybe<Scalars['String']>;
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { UploadImage: (
    { __typename?: 'UploadImageResponse' }
    & Pick<UploadImageResponse, 'error'>
    & { image?: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'filepath' | 'ocr' | 'noteId' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type ImagesQueryVariables = Exact<{
  noteId: Scalars['Int'];
}>;


export type ImagesQuery = (
  { __typename?: 'Query' }
  & { images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'filename' | 'filepath' | 'ocr' | 'event' | 'noteId' | 'createdAt' | 'updatedAt'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserCoreFragment
  )> }
);

export type NoteQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type NoteQuery = (
  { __typename?: 'Query' }
  & { note?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id' | 'title' | 'text' | 'isPublic' | 'creatorId' | 'createdAt' | 'updatedAt' | 'canEdit'>
    & { images?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'filename' | 'filepath' | 'ocr' | 'event'>
    )>> }
  )> }
);

export type NoteImagesQueryVariables = Exact<{
  noteId: Scalars['Int'];
}>;


export type NoteImagesQuery = (
  { __typename?: 'Query' }
  & { images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'filename' | 'filepath' | 'ocr' | 'event' | 'noteId' | 'createdAt' | 'updatedAt'>
  )> }
);

export type NotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type NotesQuery = (
  { __typename?: 'Query' }
  & { notes: (
    { __typename?: 'PaginatedNotes' }
    & Pick<PaginatedNotes, 'hasMore'>
    & { notes: Array<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'isPublic' | 'textSnippet' | 'canEdit'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'email'>
      ) }
    )> }
  ) }
);

export const ErrorResponseFragmentDoc = gql`
    fragment ErrorResponse on FieldError {
  field
  message
}
    `;
export const UserCoreFragmentDoc = gql`
    fragment UserCore on User {
  id
  email
  username
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...ErrorResponse
    }
    user {
      ...UserCore
    }
  }
}
    ${ErrorResponseFragmentDoc}
${UserCoreFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateNoteDocument = gql`
    mutation CreateNote($input: NoteInput!) {
  createNote(input: $input) {
    note {
      id
      isPublic
      creatorId
      title
      text
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateNoteMutation() {
  return Urql.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      ...ErrorResponse
    }
    user {
      ...UserCore
    }
  }
}
    ${ErrorResponseFragmentDoc}
${UserCoreFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UsernamePasswordInput!) {
  register(input: $input) {
    errors {
      ...ErrorResponse
    }
    user {
      ...UserCore
    }
  }
}
    ${ErrorResponseFragmentDoc}
${UserCoreFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateNoteDocument = gql`
    mutation UpdateNote($input: NoteInput!, $id: Int!) {
  updateNote(input: $input, id: $id) {
    note {
      id
      isPublic
      creatorId
      title
      text
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const UploadImageDocument = gql`
    mutation UploadImage($image: Upload!, $noteId: Int!, $event: String) {
  UploadImage(file: $image, noteId: $noteId, event: $event) {
    image {
      id
      filepath
      ocr
      noteId
      createdAt
      updatedAt
    }
    error
  }
}
    `;

export function useUploadImageMutation() {
  return Urql.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument);
};
export const ImagesDocument = gql`
    query Images($noteId: Int!) {
  images(noteId: $noteId) {
    id
    filename
    filepath
    ocr
    event
    noteId
    createdAt
    updatedAt
  }
}
    `;

export function useImagesQuery(options: Omit<Urql.UseQueryArgs<ImagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ImagesQuery>({ query: ImagesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserCore
  }
}
    ${UserCoreFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const NoteDocument = gql`
    query Note($id: Int!) {
  note(id: $id) {
    id
    title
    text
    isPublic
    creatorId
    createdAt
    updatedAt
    canEdit
    images {
      filename
      filepath
      ocr
      event
    }
  }
}
    `;

export function useNoteQuery(options: Omit<Urql.UseQueryArgs<NoteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NoteQuery>({ query: NoteDocument, ...options });
};
export const NoteImagesDocument = gql`
    query NoteImages($noteId: Int!) {
  images(noteId: $noteId) {
    id
    filename
    filepath
    ocr
    event
    noteId
    createdAt
    updatedAt
  }
}
    `;

export function useNoteImagesQuery(options: Omit<Urql.UseQueryArgs<NoteImagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NoteImagesQuery>({ query: NoteImagesDocument, ...options });
};
export const NotesDocument = gql`
    query Notes($limit: Int!, $cursor: String) {
  notes(limit: $limit, cursor: $cursor) {
    notes {
      id
      createdAt
      updatedAt
      title
      isPublic
      textSnippet
      canEdit
      creator {
        id
        username
        email
      }
    }
    hasMore
  }
}
    `;

export function useNotesQuery(options: Omit<Urql.UseQueryArgs<NotesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NotesQuery>({ query: NotesDocument, ...options });
};