import { addCourseAPI, getAllCourseAPI } from "@/API/services/courseService";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/layouts/components/DatePicker";
import ImageUploader, {
  type ImageUploaderRef,
} from "@/layouts/components/ImageUploader";
import { SearchSelect } from "@/layouts/components/SearchSelect";
import { SelectInput } from "@/layouts/components/Select";
import { studentSchema } from "@/schemas/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function StudentForm() {
  const navigate = useNavigate();
  const [courses, setcourses] = useState<{ value: string; label: string }[]>([
    {
      value: "",
      label: "",
    },
  ]);
  const imageUploaderRef = useRef<ImageUploaderRef>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      dateOfBirth: undefined,
      fathersName: "",
      mothersName: "",
      guardiansName: "",
      maritalStatus: undefined,
      course: "",
      registrationNo: "",
      registrationYear: undefined,
      addmissionDate: undefined,
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      adhaarNo: "",
      photo: undefined,
      signature: undefined,
      documents: undefined,
      isCompleted: false,
      isActive: true,
      year: "",
    },
  });
  useEffect(() => {
    getAllCourseAPI()
      .then((res) => {
        setcourses(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    console.log(formData);
    addCourseAPI(formData)
      .then((res: any) => {
        console.log(res);

        if (res.status === 200) {
          handleReset();
          toast.success("Course created successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          handleReset();
          toast.error("Course already exists");
        } else {
          toast.error("Somthing went wrong");
        }
      });
  };

  const handleReset = () => {
    imageUploaderRef.current?.reset();
    reset();
  };

  // console.log(categories);

  return (
    <div className="w-full h-full flex justify-center items-start">
      <Card className="w-full p-4 max-w-7xl gap-y-3">
        <CardHeader className="font-bold  h-[36px] ">
          <div className="w-full h-full  flex justify-between items-center">
            <h2>Add Student</h2>
          </div>
        </CardHeader>
        <Separator />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col gap-4"
        >
          <div className="flex-2rounded-xl gap-y-4 gap-x-7 grid grid-cols-1 lg:grid-cols-2">
            <div className="gap-2 flex flex-col  ">
              <Label htmlFor="course" className="text-sm font-semibold">
                Course Name{" "}
              </Label>
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <SearchSelect
                    width="100%"
                    data={courses}
                    title="Select Course"
                    notFound="Not Found"
                    value={field.value}
                    setValue={field.onChange}
                    placeholder="Search Course"
                    className={
                      errors.course ? "border-red-500 focus:ring-red-500" : ""
                    }
                  />
                )}
              />
              {errors.course && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.course.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="name" className="text-sm font-semibold">
                Student Name
              </Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                autoComplete="off"
                placeholder="Course Name"
                className={
                  errors.name ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="fathersName" className="text-sm font-semibold">
                Fathers Name
              </Label>
              <Input
                type="text"
                id="fathersName"
                {...register("fathersName")}
                autoComplete="off"
                placeholder="Course Name"
                className={
                  errors.fathersName ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.fathersName && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.fathersName.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="mothersName" className="text-sm font-semibold">
                Mothers Name
              </Label>
              <Input
                type="text"
                id="mothersName"
                {...register("mothersName")}
                autoComplete="off"
                placeholder="Course Name"
                className={
                  errors.mothersName ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.mothersName && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.mothersName.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="guardiansName" className="text-sm font-semibold">
                Guardians Name
              </Label>
              <Input
                type="text"
                id="guardiansName"
                {...register("guardiansName")}
                autoComplete="off"
                placeholder="Course Name"
                className={
                  errors.guardiansName
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
              />
              {errors.guardiansName && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.guardiansName.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="email" className="text-sm font-semibold">
                Student Email
              </Label>
              <Input
                type="text"
                id="email"
                {...register("email")}
                autoComplete="off"
                placeholder="Student Email"
                className={
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="phone" className="text-sm font-semibold">
                Phone Number
              </Label>
              <Input
                type="text"
                id="phone"
                {...register("phone")}
                autoComplete="off"
                placeholder="Phone Number"
                className={
                  errors.phone ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.phone && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="adhaarNo" className="text-sm font-semibold">
                Adhaar Number
              </Label>
              <Input
                type="text"
                id="adhaarNo"
                {...register("adhaarNo")}
                autoComplete="off"
                placeholder="Adhaar Number"
                className={
                  errors.adhaarNo ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.adhaarNo && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.adhaarNo.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="registrationNo" className="text-sm font-semibold">
                Registration Number
              </Label>
              <Input
                type="text"
                id="registrationNo"
                {...register("registrationNo")}
                autoComplete="off"
                placeholder="Registration Number"
                className={
                  errors.registrationNo
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
              />
              {errors.registrationNo && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.registrationNo.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="city" className="text-sm font-semibold">
                City
              </Label>
              <Input
                type="text"
                id="city"
                {...register("city")}
                autoComplete="off"
                placeholder="City"
                className={
                  errors.city ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.city && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="gap-2 flex flex-col ">
              <Label htmlFor="dateOfBirth" className="text-sm font-semibold">
                Date Of Birth
              </Label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    placeholder="Select Date of Birth"
                  />
                )}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label
                htmlFor="registrationYear"
                className="text-sm font-semibold"
              >
                Registration Year
              </Label>
              <Controller
                name="registrationYear"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    placeholder="Select Registration Year"
                    type="year"
                  />
                )}
              />
              {errors.registrationYear && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.registrationYear.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="addmissionDate" className="text-sm font-semibold">
                Addmission Date
              </Label>
              <Controller
                name="addmissionDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    placeholder="Select Addmission Date"
                  />
                )}
              />
              {errors.addmissionDate && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.addmissionDate.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="maritalStatus" className="text-sm font-semibold">
                Marital Status
              </Label>
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    values={[
                      { name: "Married", value: "married" },
                      { name: "UnMarried", value: "unmarried" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Marital Status"
                    title="Marital Status"
                    width={"100%"}
                  />
                )}
              />
              {errors.maritalStatus && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.maritalStatus.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="name" className="text-sm font-semibold">
                Student Name
              </Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                autoComplete="off"
                placeholder="Course Name"
                className={
                  errors.name ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="name" className="text-sm font-semibold">
                Student Name
              </Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                autoComplete="off"
                placeholder="Course Name"
                className={
                  errors.name ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex  gap-3">
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="photo" className="text-sm font-semibold">
                Student Photo
              </Label>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    ref={imageUploaderRef}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.photo?.message}
                    previewUrl="" // optional, for edit
                    maxSizeMB={1}
                  />
                )}
              />
              {errors.photo && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="signature" className="text-sm font-semibold">
                Student Signature
              </Label>
              <Controller
                name="signature"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    ref={imageUploaderRef}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.signature?.message}
                    previewUrl="" // optional, for edit
                    maxSizeMB={1}
                  />
                )}
              />
              {errors.signature && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.signature.message}
                </p>
              )}
            </div>
            <div className="gap-2 flex flex-col ">
              <Label htmlFor="image" className="text-sm font-semibold">
                Student Document
              </Label>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    ref={imageUploaderRef}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.documents?.message}
                    previewUrl="" // optional, for edit
                    maxSizeMB={1}
                  />
                )}
              />
              {errors.documents && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.documents.message}
                </p>
              )}
            </div>
          </div>
          <Separator />
          <CardFooter className="w-full flex justify-end px-3">
            <Button
              onClick={handleReset}
              type="reset"
              variant="outline"
              className="text-sm font-semibold"
            >
              Refresh
            </Button>
            <Button type="submit" className="ml-2 text-sm font-semibold">
              {"Add"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default StudentForm;
