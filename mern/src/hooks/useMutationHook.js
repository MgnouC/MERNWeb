import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback, options = {}) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
    ...options, // Spread any additional options like onSuccess, onError
  });

  return mutation;
};
