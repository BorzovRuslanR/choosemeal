import React from 'react'

export default function ShadowText() {
  return (
    <span className="text-4xl m-4">
  <span className="relative">
    <span className="text-gray-700">С</span>
    <span className="text-gray-300 absolute top-0 left-0">С</span>
    <span className="text-gray-100 absolute top-0 left-0">С</span>
  </span>
  <span className="relative">
    <span className="text-gray-700">Т</span>
    <span className="text-gray-300 absolute top-0 left-0">Т</span>
    <span className="text-gray-100 absolute top-0 left-0">Т</span>
  </span>
  <span className="relative">
    <span className="text-gray-700">А</span>
    <span className="text-gray-300 absolute top-0 left-0">А</span>
    <span className="text-gray-100 absolute top-0 left-0">А</span>
  </span>
  <span className="relative">
    <span className="text-gray-700">Р</span>
    <span className="text-gray-300 absolute top-0 left-0">Р</span>
    <span className="text-gray-100 absolute top-0 left-0">Р</span>
  </span>
  <span className="relative">
    <span className="text-gray-700">Т</span>
    <span className="text-gray-300 absolute top-0 left-0">Т</span>
    <span className="text-gray-100 absolute top-0 left-0">Т</span>
  </span>
</span>
  )
}
