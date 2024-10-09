"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { toast, useToast } from "@/components/hooks/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"

// check


const voiceCategories = ['Alloy','Shimer','Nova','Echo','Fable','Onyx']

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "PodcastTitle must be at least 2 characters.",
  }),
  podcastDescription: z.string().min(2, {
    message: "PodcastDescription must be at least 2 characters.",
  }),
})

const CreatePodcast = () => {

  const router =  useRouter();

  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('');
  
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0);
  
  const [voiceType, setVoiceType] = useState<string >('');
  const [voicePrompt, setVoicePrompt] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {toast} = useToast()

  const createPodcast = useMutation(api.podcasts.createPodcast)

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: ""
    },
  })
 
  // 2. Define a submit handler.


  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if(!audioUrl || !imageUrl || !voiceType)
      {
        toast({
          title: 'Please generate audio and url'
        })

        setIsSubmitting(false);
        throw Error('Please generate audio and url')
      }
      
      const podcast = await createPodcast({
      podcastTitle: data.podcastTitle,
      podcastDescription : data.podcastDescription,
      audioUrl,
      imageUrl,
      imagePrompt,
      voicePrompt,
      views: 0,
      audioDuration,
      audioStorageId : audioStorageId!,
      imageStorageId : imageStorageId!,
      voiceType: voiceType!,

        
      })
      toast({ title: 'Podcast created' })
      setIsSubmitting(false);
      router.push('/')

    } catch (error) {
      console.log(error);
      toast({
        title: 'Error, check audio and image are generated or not ',
        variant: 'destructive',
      })
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex flex-col">
      <h1 className='text-20 font-bold text-white-1'>Create Podcast</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="mt-12 flex w-full flex-col">

        <div className="flex flex-col gap-[30px] border-b border-black-5 pb-5">
        <FormField
            control={form.control}
            name="podcastTitle"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5">
                <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                <FormControl>
                  <Input className="input-class focus-visible:ring-orange-1" placeholder="podcast  " {...field} />
                </FormControl>
                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2.5 ">
            <Label className="text-16 font-bold text-white-1">
              Select AI voice 
            </Label>

            <Select onValueChange={(value)=>setVoiceType(value)}>

            <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1  focus:ring-orange-1')}>
              <SelectValue placeholder="Select AI voice" className="placeholder:text-gray-1 "/>
            </SelectTrigger>

            <SelectContent className="text-16 border-none font-bold text-white-1 focus:ring-orange-1">
              {voiceCategories.map((category)=>(
                <SelectItem key = {category} value= {category} className="capitalize focus:bg-orange-1">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
            {/* for checking audio of the bots  */}
            {
              voiceType && (
                <audio 
                src={`/${voiceType}.mp3`}
                autoPlay
                className="hidden"
                >

                </audio>
              )
            }
          </Select>

          
          </div>

          <FormField
            control={form.control}
            name="podcastDescription"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5">
                <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                <FormControl>
                  <Textarea className="input-class focus-visible:ring-orange-1" placeholder="write a short podcast description" {...field} />
                </FormControl>
                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          /> 

        </div>

        <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId = {setAudioStorageId}
              setAudio  = {setAudioUrl}
              voiceType = {voiceType}
              audio = {audioUrl}
              voicePrompt = {voicePrompt}
              setVoicePrompt = {setVoicePrompt}
              setAudioDuration = {setAudioDuration}
            />

            <GenerateThumbnail
            setImage={setImageUrl}
            setImageStorageId={setImageStorageId}
            image={imageUrl}
            imagePrompt={imagePrompt}
            setImagePrompt={setImagePrompt}

            />

            <div className="mt-10 mb-10 w-full">
                <Button type="submit" className=" text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1
                transition-all duration-500 hover:bg-black-1">
                  {isSubmitting ? (
                    <>
                      Submitting
                      <Loader size={20} className="animate-spin ml-2"/>
                    </>
                  ): ('Submit & Publish Podcast')}
                </Button>
            </div>

        </div>

        </form>
      </Form>
    </section>
    
  )
}

export default CreatePodcast

