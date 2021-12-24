import Review from "../models/Review.mjs";

export const createReview = async (req, res) => {
  const { tmdbId, formSchema, formValues } = req.body;

  const newReview = new Review({
    tmdbId,
    formSchema,
    formValues,
    user: req.user.id,
  });
  try {
    await newReview.save();
    res.status(200).json({ newReview });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Unknown server error" });
  }
};

export const updateReview = async (req, res) => {
  const { formSchema, formValues } = req.body;

  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (formSchema) {
      review.formSchema = formSchema;
      review.markModified("formSchema");
    }
    if (formValues) {
      review.formValues = formValues;
      review.markModified("formValues");
    }

    const updatedReview = await review.save();

    res.status(200).json({ updatedReview });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Unknown server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Unknown server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id });
    res.status(200).json({ reviews });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Unknown server error" });
  }
};
