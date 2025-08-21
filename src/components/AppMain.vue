<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import {
  BrushCleaning,
  CircleAlert,
  CircleCheckBig,
  Download,
  FileText,
  LoaderCircle,
  Upload,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { type ResumeResults } from '@/types/resume'
import { resume as mockResume } from '@/lib/mock'

const DEBUG = false

const file = ref<File | null>(null)
const resumeResults = ref<ResumeResults | null>(null)
const isLoading = ref(false)

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  file.value = target.files?.[0] || null
}

function handleUpload() {
  if (DEBUG) {
    isLoading.value = true

    setTimeout(() => {
      resumeResults.value = mockResume as unknown as ResumeResults
      isLoading.value = false
    }, 2000)

    return
  }

  getEnhancedResumeData()
}

const handleClear = () => {
  file.value = null
  resumeResults.value = null
}

async function getEnhancedResumeData() {
  const formData = new FormData()
  formData.append('file', file.value!)

  try {
    isLoading.value = true

    const endpointUrl = `${import.meta.env.VITE_API_ROOT}/resumes/enhance`
    const result = await fetch(endpointUrl, {
      method: 'POST',
      body: formData,
    })

    if (!result.ok) {
      throw new Error(`Server responded with status: ${result.status}`)
    }

    const data = await result.json()
    resumeResults.value = data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

async function downloadResume() {
  const formData = new FormData()
  formData.append('file', file.value!)

  try {
    isLoading.value = true

    const endpointUrl = `${import.meta.env.VITE_API_ROOT}/resumes/download`
    const response = await fetch(endpointUrl, {
      method: 'POST',
      body: JSON.stringify(resumeResults.value),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`)
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'resume.pdf'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  if (DEBUG) {
    resumeResults.value = mockResume as unknown as ResumeResults
  }
})
</script>

<template>
  <div class="flex w-full space-y-4 p-4">
    <div class="space-y-4 text-center">
      <h1 class="text-3xl font-bold">Resume Enhancer</h1>
      <p class="text-gray-500">Upload your resume and get AI-powered improvements and feedback</p>
    </div>

    <Card v-if="!resumeResults">
      <CardHeader>
        <CardTitle class="inline-flex items-center font-bold">
          <FileText class="mr-2" />
          Upload your resume
        </CardTitle>
        <CardDescription class="text-sm text-gray-500">
          Upload a PDF file to get started. Our AI will analyze and enhance your resume.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex space-x-4">
          <Input type="file" @change="onChange" />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col space-y-2 px-6">
        <Button
          class="w-full"
          :disabled="!file || isLoading"
          aria-label="Upload resume"
          @click="handleUpload"
        >
          <template v-if="isLoading">
            <span class="flex items-center justify-center">
              <LoaderCircle class="mr-2 animate-spin" />
              Enhancing resume (Est. 2 min)...
            </span>
          </template>
          <template v-else>
            <Upload />
            Enhance resume
          </template>
        </Button>

        <Button
          class="w-full"
          :disabled="!file || isLoading"
          variant="destructive"
          aria-label="Clear resume"
          @click="handleClear"
        >
          <BrushCleaning />
          Remove file
        </Button>
      </CardFooter>
    </Card>

    <div v-if="resumeResults" class="flex flex-col space-y-8 border border-gray-50 p-2">
      <div class="flex flex-col justify-between max-md:space-y-4 md:flex-row">
        <h2 class="text-2xl font-bold">Analysis Complete</h2>
        <Button @click="handleClear">
          <Upload />
          Upload new resume
        </Button>
      </div>

      <div class="flex flex-col space-y-4 md:columns-2 md:flex-row md:space-x-4">
        <!-- Enhanced resume download -->
        <Card class="md:w-1/2">
          <CardHeader>
            <CardTitle>Enhanced Resume</CardTitle>
            <CardDescription>Your improved resume is ready for download</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col items-center space-y-4 rounded bg-gray-100 p-6">
              <FileText :size="64" class="text-gray-400" />
              <span class="text-sm text-gray-600">Enhanced version of your resume</span>
              <Button class="w-full" @click="downloadResume">
                <Download />
                Download enhanced resume
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- AI Feedback -->
        <Card class="md:w-1/2">
          <CardHeader>
            <CardTitle>AI Feedback</CardTitle>
            <CardDescription>Insights and suggestions to improve your resume</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="feedback in resumeResults.feedback"
              :key="feedback.description"
              class="flex flex-col space-y-1"
            >
              <div class="flex items-center">
                <component
                  :is="feedback.is_positive ? CircleCheckBig : CircleAlert"
                  :size="18"
                  class="mr-2"
                  :class="feedback.is_positive ? 'text-green-500' : 'text-orange-500'"
                />
                <span
                  class="rounded px-2 py-0.5 text-xs font-bold"
                  :class="feedback.is_positive ? 'bg-dark text-light' : 'bg-gray-200'"
                >
                  {{ feedback.category }}
                </span>
              </div>
              <p>{{ feedback.description }}</p>

              <hr class="my-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
