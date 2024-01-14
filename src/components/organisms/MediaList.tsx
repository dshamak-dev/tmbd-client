"use client";

import React, { useEffect, useMemo, useReducer } from "react";
import { MovieCard } from "src/components/molecules/MovieCard";

interface MediaListProps {
  request: () => Promise<any>;
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

type ReducerDataType = Record<string, any> | null;
type ReducerActionType = "loading" | "data" | "error";
type ReducerActionValueType = ReducerDataType | boolean | null;

type ReducerAction = {
  type: ReducerActionType;
  value: ReducerActionValueType;
};
type ReducerStateType = {
  loading: boolean;
  data: ReducerDataType;
  error: string | null;
};

const reducer = (prev: ReducerStateType, { type, value }: ReducerAction) => {
  const _next: ReducerStateType = Object.assign({}, initialState, prev);

  switch (type) {
    case "data": {
      _next.loading = false;
      _next.error = null;
      _next.data = value as ReducerDataType;
      break;
    }
    case "loading": {
      _next.loading = !!value;
      break;
    }
    case "error": {
      _next.loading = false;
      _next.error = value as any;
      break;
    }
  }

  return _next;
};

export const MediaList: React.FC<MediaListProps> = ({ request }) => {
  const [{ loading, data, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleRequest = async () => {
    dispatch({ type: "loading", value: true });

    request()
      .then((res) => {
        dispatch({ type: "data", value: res });
      })
      .catch((err) => {
        dispatch({ type: "error", value: err.message });
      });
  };

  const content = useMemo(() => {
    if (!data) {
      return null;
    }

    const list = data || [];

    return (
      list.map((it, index) => {
        return <MovieCard key={it.id} data={it} className="w-screen sm:w-48" />;
      }) || null
    );
  }, [data]);

  useEffect(() => {
    handleRequest();
  }, []);

  return loading ? "loading" : content;
};
